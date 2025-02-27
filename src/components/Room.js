import React, {useState, useEffect} from "react";
import moment from "moment";
import styles from '../styles/Room.module.css';

export const STATES = {
  free: '#1faf1f',
  soonTaken: '#dfdf1f',
  taken: '#df1f1f',
};

const Room = ({style, roomName, activity, date, state, fakeRoom = false}) => {
  const [progress, setProgress] = useState('0%');

  useEffect(() => {
    if (activity) {
      let calc = (((date - activity.start) / (activity.end - activity.start)) * 100);
      setProgress(calc < 0 ? '0%' : calc + '%');
    }
  }, [activity, date]);

  if (!STATES[state]) {
    console.error('valid states are: free, soonTaken, and taken');
    return <></>;
  }

  return (
    <div style={{...style, overflow: "hidden", fontWeight: "bold", padding: '1%', borderRadius: 10, display: "flex", flex: 1, margin: "1%", textAlign: "center", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: STATES[state]}} >
      {!fakeRoom && <div style={{width: '100%'}}>
        <h1 className={styles.roomName} style={{...cStyles.textMargin}}>{roomName}</h1>
        {activity ?
            <div className={styles.commonText} style={{width: '100%'}}>
              <p style={{...cStyles.textMargin}}>{activity.codemodule}</p>
              <p style={{...cStyles.textMargin, whiteSpace: "nowrap"}}>{activity.title}</p>
              <div style={{display: 'flex', width: '100%', alignItems: "center", justifyContent: "space-around", fontWeight: "bold"}}>
                <p style={{...cStyles.textMargin}}>{moment(activity.start).format('LT')}</p>
                <div className={styles.progressBar} style={{borderColor: 'black'}}>
                  <div className={styles.progressBarValue}
                       style={{width: progress, backgroundColor: 'black'}}>&nbsp;</div>
                </div>
                <p style={{...cStyles.textMargin}}>{moment(activity.end).format('LT')}</p>
              </div>
            </div>
            :
            <div className={styles.commonText} >
              Libre toute la journée
            </div>
        }
      </div>}
    </div>
  );
};

const cStyles = {
  textMargin: {
    marginBottom: 10,
    marginTop: 10,
  }
}

export default Room;
