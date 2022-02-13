import './App.css';
import { useState } from 'react';
import VirtualScroller from './components/virtual-scroller';

const mockImgs = [
  'https://dummyimage.com/390x400/000/fff&text=NO.0',
  'https://dummyimage.com/390x300/999/fff&text=NO.1',
  'https://dummyimage.com/390x200/666/fff&text=NO.2',
  'https://dummyimage.com/390x400/000/fff&text=NO.3',
  'https://dummyimage.com/390x300/999/fff&text=NO.4',
  'https://dummyimage.com/390x200/666/fff&text=NO.5',
  'https://dummyimage.com/390x400/000/fff&text=NO.6',
  'https://dummyimage.com/390x300/999/fff&text=NO.7',
  'https://dummyimage.com/390x200/666/fff&text=NO.8',
  'https://dummyimage.com/390x400/000/fff&text=NO.9',
  'https://dummyimage.com/390x300/999/fff&text=NO.10',
  'https://dummyimage.com/390x200/666/fff&text=NO.11',
  'https://dummyimage.com/390x400/000/fff&text=NO.12',
  'https://dummyimage.com/390x300/999/fff&text=NO.13',
  'https://dummyimage.com/390x200/666/fff&text=NO.14',
  'https://dummyimage.com/390x400/000/fff&text=NO.15',
  'https://dummyimage.com/390x300/999/fff&text=NO.16',
  'https://dummyimage.com/390x200/666/fff&text=NO.17',
  'https://dummyimage.com/390x400/000/fff&text=NO.18',
  'https://dummyimage.com/390x300/999/fff&text=NO.19',
];

function createDataSource(prev = 0) {
  return Array.from({ length: 40 }).map((item, index) => ({
    id: prev + index,
    imgUrl: mockImgs[(prev + index)%20],
  }));
}


function App() {
  const [dataSource, setDataSource] = useState(createDataSource());

  return (
    <div className="App">
      <div className="app-header">HEADER</div>
      <div className="app-main">
        <VirtualScroller
          dataSource={dataSource}
          itemRender={(item, idx) => {
            return <img style={{width: '100%'}} src={item.imgUrl} alt="" />
          }}
        />
      </div>
    </div>
  );
}

export default App;
