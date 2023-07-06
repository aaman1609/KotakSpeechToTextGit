import React from 'react';

function App() {
   useEffect(() => {
    (async function () {
      const { text } = await( await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  return <div>{data}</div>;

  // const value = 'World';
  // return <div>Hello {value}</div>;
}

export default App;
