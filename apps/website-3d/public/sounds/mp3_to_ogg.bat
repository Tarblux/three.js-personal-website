@echo off
setlocal

:: Set the quality level (0 = best, 10 = worst; typical good = 4 or 5)
set QUALITY=5

echo Converting all MP3 files in %cd% to OGG...
echo Using quality level %QUALITY%...

for %%F in (*.mp3) do (
    echo Processing: %%F
    ffmpeg -i "%%F" -qscale:a %QUALITY% "%%~nF.ogg"
)

echo Done!
pause
