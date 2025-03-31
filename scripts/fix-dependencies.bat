@echo off
echo Fixing dependency issues...

:: Install the missing dependencies
npm install glob-parent fast-glob --save

:: Clear npm cache
echo Clearing npm cache...
npm cache clean --force

:: Reinstall dependencies
echo Reinstalling dependencies...
npm install

echo Dependencies fixed! Try running the build again.
