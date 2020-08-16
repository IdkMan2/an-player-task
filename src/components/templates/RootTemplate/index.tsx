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
    <React.Fragment>
      <div className={classes.backgroundLayer}>{props.backgroundLayer}</div>
      <div className={classes.sectionsContainer}>
        <section>{props.header}</section>
        <section className={classes.bodySection}>{props.body}</section>

        <section className={classes.stickyBottom}>
          <section style={{ marginTop: 32 }}>{props.player}</section>
          <section style={{ marginTop: 18 }}>{props.progressBar}</section>
          <section style={{ marginTop: 15 }}>{props.musicWave}</section>
          <section>{props.footer}</section>
        </section>
      </div>
    </React.Fragment>
  );
}

export default memo(RootTemplate);