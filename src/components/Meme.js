import React, {useState, useEffect} from "react"




export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                
                setAllMemeImages(data.data.memes)
            })
    },[])
    
    
    function getMemeImage() {
        const memesArray = allMemeImages
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
          
            randomImage: url
        }))
        
    }

    function memeInput(event) {
        const {value, name} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
       <div className="form">
        <input type="text" name="topText" value={meme.topText} onChange={memeInput} ></input>
        <input type="text" name="bottomText" value={meme.bottomText} onChange={memeInput} ></input>
        <button onClick={getMemeImage}>Generate New Meme</button>

       </div>
       <div className="meme-container">
       <img className="meme" alt="Meme" src={meme.randomImage}></img>
        <p className="meme-text top">{meme.topText}</p>
        <p className="meme-text bot">{meme.bottomText}</p>
       </div>
       </main>
    )
}