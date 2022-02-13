import './App.css';
import { useState } from 'react';
import VirtualScroller from './components/virtual-scroller';

const mockImgs = [
  'https://dummyimage.com/390x400/000/fff',
  'https://dummyimage.com/390x300/999/fff',
  'https://dummyimage.com/390x200/666/fff'
];

function createDataSource(prev = 0) {
  return Array.from({ length: 30 }).map((item, index) => ({
    id: prev + index,
    imgUrl: mockImgs[Math.floor(Math.random() * 100 % 3)],
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
          itemKey="id"
          itemRender={(item, idx) => {
            return <img style={{width: '100%'}} src={item.imgUrl} alt="" />
          }}
        />
      </div>
    </div>
  );
}

export default App;
