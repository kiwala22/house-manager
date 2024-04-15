const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center justify-center space-x-2 animate-pulse delay-1000">
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        <div className="w-6 h-6 bg-green-400 rounded-full"></div>
        <div className="w-6 h-6 bg-black rounded-full"></div>
      </div>
    </div>
  )
}

export default LoadingIndicator;