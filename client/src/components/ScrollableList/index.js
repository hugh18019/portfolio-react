import React from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeList as ScrollableList } from 'react-window';

// These row heights are arbitrary.
// Yours should be based on the content of the row.
const rowSizes = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = index => rowSizes[index];

// const Row = ({ index }) => (
//   <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
//     Row {index}
//   </div>
// );

const List = ({ props: messages }) => {

  console.log('messages in List component', messages)

  const Row = ({ index }) => (
    <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
      Row {index}
    </div>
  );


  return (
    <ScrollableList
        className="List"
        height={50}
        itemCount={24}
        itemSize={100}
        width={300}
        overscanCount={4}
    >
        {Row}
    </ScrollableList>
  );
};

module.exports = List;