import os
import subprocess
import numpy as np
from scipy.io import wavfile

# Configuration
INPUT_VIDEO = "../public/hero/intro.mp4" # Or intro.mov
OUTPUT_DIR = "../public/hero"
CROP_FILTER = "crop=800:1000:560:80" # Update this for your specific video!
SCALE_FILTER = "scale=768:-1"
WHITEN_FILTER = "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
DURATION = 10.0
XFADE_DURATION = 0.5
AUDIO_SAMPLE_RATE = 44100

def run_cmd(cmd):
    print("Running:", " ".join(cmd))
    subprocess.run(cmd, check=True)

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs("../public", exist_ok=True)
    
    # 1. Extract first 10.5 seconds (DURATION + XFADE_DURATION)
    temp_vid = "temp_10s.mp4"
    if os.path.exists(temp_vid): os.remove(temp_vid)
    run_cmd(["ffmpeg", "-y", "-i", INPUT_VIDEO, "-t", str(DURATION + XFADE_DURATION), 
             "-vf", f"{CROP_FILTER},{SCALE_FILTER},{WHITEN_FILTER}", 
             "-c:v", "libx264", "-crf", "18", temp_vid])
             
    # 2. Extract Audio
    temp_wav = "temp_audio.wav"
    if os.path.exists(temp_wav): os.remove(temp_wav)
    run_cmd(["ffmpeg", "-y", "-i", INPUT_VIDEO, "-t", str(DURATION + XFADE_DURATION), 
             "-vn", "-ar", str(AUDIO_SAMPLE_RATE), "-ac", "2", temp_wav])
             
    # 3. Crossfade Audio using numpy
    sr, audio = wavfile.read(temp_wav)
    if audio.dtype != np.float32:
        audio = audio.astype(np.float32) / np.iinfo(audio.dtype).max
        
    xfade_samples = int(XFADE_DURATION * sr)
    duration_samples = int(DURATION * sr)
    
    out_audio = np.zeros((duration_samples, audio.shape[1]), dtype=np.float32)
    out_audio[:duration_samples - xfade_samples] = audio[:duration_samples - xfade_samples]
    
    # Crossfade region
    fade_out = np.linspace(1.0, 0.0, xfade_samples)[:, np.newaxis]
    fade_in = np.linspace(0.0, 1.0, xfade_samples)[:, np.newaxis]
    
    # The end of the core overlaps with the start of the extra 0.5s
    end_part = audio[duration_samples - xfade_samples : duration_samples]
    start_part = audio[duration_samples : duration_samples + xfade_samples]
    
    out_audio[duration_samples - xfade_samples:] = (end_part * fade_out) + (start_part * fade_in)
    
    out_wav = "looped_audio.wav"
    wavfile.write(out_wav, sr, out_audio)
    
    # 4. Crossfade Video using ffmpeg xfade
    looped_vid = "looped_vid.mp4"
    run_cmd(["ffmpeg", "-y", "-i", temp_vid, 
             "-filter_complex", f"[0:v]split[v1][v2]; [v1]trim=start=0:end={DURATION}[v1_trim]; [v2]trim=start={DURATION}:end={DURATION+XFADE_DURATION}[v2_trim]; [v1_trim][v2_trim]xfade=transition=fade:duration={XFADE_DURATION}:offset={DURATION-XFADE_DURATION}[vout]", 
             "-map", "[vout]", "-c:v", "libx264", "-crf", "18", looped_vid])
             
    # 5. Export final outputs
    # hero.mp4
    run_cmd(["ffmpeg", "-y", "-i", looped_vid, "-i", out_wav, "-c:v", "libx264", "-crf", "24", "-preset", "slow", 
             "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", os.path.join(OUTPUT_DIR, "hero.mp4")])
             
    # hero.webm
    run_cmd(["ffmpeg", "-y", "-i", looped_vid, "-i", out_wav, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
             "-c:a", "libopus", "-b:a", "80k", os.path.join(OUTPUT_DIR, "hero.webm")])
             
    # 6. Extract portrait and og image
    run_cmd(["ffmpeg", "-y", "-i", temp_vid, "-ss", "2", "-vframes", "1", "-vf", "crop=480:600", os.path.join("../public", "portrait-bust.webp")])
    run_cmd(["ffmpeg", "-y", "-i", temp_vid, "-ss", "2", "-vframes", "1", "-vf", "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630", os.path.join("../public", "og.jpg")])
    
    # Cleanup
    os.remove(temp_vid)
    os.remove(temp_wav)
    os.remove(out_wav)
    os.remove(looped_vid)
    print("Done! Assets created in public directory.")

if __name__ == "__main__":
    main()
