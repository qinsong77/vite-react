const randomNum = () => Math.floor(Math.random() * 100)
const GetRandomColor = () => `rgb(${randomNum()},${randomNum()},${randomNum()})`

export default GetRandomColor
