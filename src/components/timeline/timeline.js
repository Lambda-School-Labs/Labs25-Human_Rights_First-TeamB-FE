import React from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';
import axios from 'axios';
import { useState, useEffect } from 'react';

const last = function last(array, n) {
  if (array == null) return void 0;
  if (n == null) return array[array.length - 1];
  return array.slice(Math.max(array.length - n, 0));
};

export default function PbTimeline() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`https://api.846policebrutality.com/api/incidents`)
        .then(res => {
          setResults(last(res.data.data, 10));
        })
        .catch(err => {
          console.log(err);
        });
    }

    getData();
  }, []);

  console.log(results);

  return (
    <>
      <div className="tl-header">
        <h2>Timeline of Recent Events</h2>
      </div>
      {results.map(item => (
        <Timeline lineColor={'#ddd'} className="pbTimeline">
          <TimelineItem
            key={item.id}
            dateText={item.date}
            style={{ color: '#bc541e' }}
          >
            <h3>
              <a href={item.links[0]}>{item.title}</a>
            </h3>
            <h3>
              {item.city}, {item.state}
            </h3>
            <h4>Keywords: {item.tags.map(item => item + ' ')}</h4>
            <p>
              Sources: <br />
              {item.links.map(element => (
                <a href={element}>
                  {' '}
                  Link {item.links.indexOf(`${element}`) + 1} <br />{' '}
                </a>
              ))}
            </p>
          </TimelineItem>
        </Timeline>
      ))}
    </>
  );
}