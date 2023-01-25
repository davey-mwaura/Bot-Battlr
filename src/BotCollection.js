import React, { useState, useEffect } from 'react';

function BotCollection() {
    const [bots, setBots] = useState([]);
    const [selectedBots, setSelectedBots] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/botcollection')
            .then(response => response.json())
            .then(data => setBots(data))
    }, []);

    const handleSelectBot = (bot) => {
        if (!selectedBots.find(b => b.id === bot.id)) {
            setSelectedBots([...selectedBots, bot]);
        } else {
            setSelectedBots(selectedBots.filter(b => b.id !== bot.id));
        }
    }

    const handleDeleteBot = (botId) => {
      // Make a DELETE request to the backend to delete the bot
      fetch(`http://localhost:4000/bots/${botId}`, { method: 'DELETE' })
          .then(response => response.json())
          .then(() => {
              // Remove the bot from the bots state
              setBots(bots.filter(bot => bot.id !== botId));
              // Remove the bot from the selectedBots state if it exists
              setSelectedBots(selectedBots.filter(bot => bot.id !== botId));
          });
  }
  

    return (
      <div>
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
                      <button onClick={() => handleSelectBot(bot)}>Add to army</button>
                      <button className="delete-button" onClick={() => handleDeleteBot(bot.id)}>x</button>
                  </div>
              ))}
          </div>
          <div className="YourBotArmy" >
          <h1 className="titletwo">YourBotArmy</h1>
              {selectedBots.map(bot => (
                  <div className="bot-cardtwo" key={bot.id}>
                      <h2>{bot.name}</h2>
                      <p>Health: {bot.health}</p>
                      <p>Damage: {bot.damage}</p>
                      <p>Armor: {bot.armor}</p>
                      <p>Class: {bot.bot_class}</p>
                      <p>Catchphrase: {bot.catchphrase}</p>
                      <img src={bot.avatar_url} alt={bot.name} />
                      <button onClick={() => handleSelectBot(bot)}>Remove from army</button>
                      <button className="delete-button" onClick={() => handleDeleteBot(bot.id)}>x</button>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default BotCollection;

