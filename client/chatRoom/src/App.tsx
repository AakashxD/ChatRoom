function App() {
  return (
    <>
      <div className="bg-black h-full">
        <div className="h-[90vh] border-b-blue-100" >
              <div>
                 all the messages
              </div>
        </div>
        <div className="bg-white"> 
               <input type="text" placeholder="enter the message" />
               <button type="button">Send</button>
        </div>
      </div>
    </>
  )
}

export default App
