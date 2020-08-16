import React, {memo, ReactNode} from "react";
import classes from './styles.module.scss';

export interface RootTemplateProps {
  header?: ReactNode,
  body?: ReactNode,
  player?: ReactNode,
  progressBar?: ReactNode,
  musicWave?: ReactNode,
  footer?: ReactNode,
  backgroundLayer?: ReactNode,
}

function RootTemplate(props: RootTemplateProps) {

  return (
    <main className={classes.root}>
      <div className={classes.backgroundLayer}>{props.backgroundLayer}</div>
      <div className={classes.sectionsContainer}>
        <section>{props.header}</section>
        <section>{props.body}</section>
        <section>{props.player}</section>
        <section>{props.progressBar}</section>
        <section>{props.musicWave}</section>
        <section>{props.footer}</section>
      </div>
    </main>
  );
}

export default memo(RootTemplate);