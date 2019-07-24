cd /d %~dp0
git add . 
git commit -m 'update'
git push -u origin master
system("pause")