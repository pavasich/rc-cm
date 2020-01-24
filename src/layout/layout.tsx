import * as React from 'react';
import { createUseStyles, Styles } from 'react-jss';
import { Properties } from 'csstype';

export interface LayoutProps {
    alignItems: Properties['alignItems'];
    justifyContent: Properties['justifyContent'];
    column?: boolean;
    row?: boolean;
    col?: boolean;
    reverse?: boolean;
}
type Props = React.HTMLAttributes<HTMLDivElement> & LayoutProps;

const useStyles = createUseStyles<'cx'>(({
    cx({ col, column, alignItems = 'center', justifyContent = 'center', reverse }: LayoutProps) {
        let flexDirection = col || column ? 'column' : 'row';
        if (reverse) {
            flexDirection = `${flexDirection}-reverse`;
        }
        return {
            alignItems,
            justifyContent,
            flexDirection,
            display: 'flex',
        };
    },
} as unknown) as Styles);

export function Layout(props: Props) {
    const classes = useStyles(props);
    const { alignItems, justifyContent, column, row, col, reverse, className = '', ...rest } = props;
    return (
        <div className={`${classes.cx} ${className}`} {...rest}>
            {props.children}
        </div>
    );
}
