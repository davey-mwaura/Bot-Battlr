import React, { useState, useEffect } from 'react';

function BotCollection() {
    const [bots, setBots] = useState([]);


  useEffect(() => {
    fetch('http://localhost:4000/botcollection')
      .then(response => response.json())
      .then(data => setBots(data))
  }, []);

//   console.log(bots)

  return (
    <div className="bot-card-container">
      
      {bots.map(bot => (
        <div className="bot-card" key={bot.id}>
          <h2>{bot.name}</h2>
          <p>Health: {bot.health}</p>
          <p>Damage: {bot.damage}</p>
          <p>Armor: {bot.armor}</p>
          <p>Class: {bot.bot_class}</p>
          <p>Catchphrase: {bot.catchphrase}</p>
          <img src={bot.avatar_url} alt={bot.name} />
        </div>
      ))}
    </div>
  );
}

export default BotCollection;
