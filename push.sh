for rev in $(git rev-list --reverse origin/master..master); do
    #git push origin $rev:branch;
    echo $rev:branch;
done
read -p "Press [Enter] key to continue..." fackEnterKey