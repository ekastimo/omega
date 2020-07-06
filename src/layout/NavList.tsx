import React, {Fragment} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useHistory, useLocation} from 'react-router-dom'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {menuItems} from "./navListItems";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        whiteText: {
            color: 'white'
        },
        menuItem: {
            color: 'white',
            '&:hover,&:focus': {
                backgroundColor: grey[800],
            }
        },
        menuItemPrimary: {
            fontSize: 'inherit',
        },
        menuItemActive: {
            color: grey[100],
        },
        menuItemIcon: {
            color: 'inherit',
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

const NavList = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = React.useState<any>({});

    const handleMenuClick = (name: string) => () => {
        const menuData = {...open, [name]: !open[name]}
        setOpen(menuData);
    };

    const onClick = (path: string) => () => {
        const {onClose} = props
        history.push(path)
        if (onClose)
            onClose()
    }
    const pathMatches = (path: string, str: string) => path.indexOf(str) > -1

    const isSelected = (pathStr?: string): boolean => {
        const {pathname} = location
        return pathMatches(pathname, pathStr || 'home')
    }

    return (
        <List style={{paddingTop: 0}}>
            {
                menuItems.map(it => {
                    const Icon = it.icon
                    if (it.items) {
                        return <Fragment key={it.name}>
                            <ListItem
                                button
                                onClick={handleMenuClick(it.name)}
                                className={clsx(classes.menuItem, isSelected(it.route) && classes.menuItemActive)}
                            >
                                <ListItemIcon className={classes.menuItemIcon}>
                                    <Icon/>
                                </ListItemIcon>
                                <ListItemText primary={it.name} classes={{
                                    primary: classes.menuItemPrimary,
                                }}/>
                                {open[it.name] ? <ExpandLess className={classes.whiteText}/> :
                                    <ExpandMore className={classes.whiteText}/>}
                            </ListItem>
                            <Collapse in={open[it.name] || isSelected(it.name.toLocaleLowerCase())} timeout="auto"
                                      unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        it.items.map(ch => <ListItem
                                            button
                                            onClick={onClick(ch.route)}
                                            selected={isSelected(ch.route)}
                                            key={ch.name}
                                            className={clsx(classes.menuItem, isSelected(ch.route) && classes.menuItemActive)}
                                        >
                                            <ListItemText inset primary={ch.name} classes={{
                                                primary: classes.menuItemPrimary,
                                            }}/>
                                        </ListItem>)
                                    }
                                </List>
                            </Collapse>
                        </Fragment>
                    }
                    return <ListItem
                        button
                        onClick={onClick(it.route)}
                        selected={isSelected(it.route)}
                        key={it.name}
                        className={clsx(classes.menuItem, isSelected(it.route) && classes.menuItemActive)}
                    >
                        <ListItemIcon className={classes.menuItemIcon}>
                            <Icon/>
                        </ListItemIcon>
                        <ListItemText primary={it.name} classes={{
                            primary: classes.menuItemPrimary,
                        }}/>
                    </ListItem>
                })
            }
        </List>
    );
}


export default NavList;
