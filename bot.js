
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                s4d.client.login('ODcyMjI5NTMyOTg2Mzg0NDI0.YQm1DQ.jevrbgGlXebcEG8YP-vBM7dKJ3U').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('ready', async () => {
  s4d.client.channels.cache.find((channel) => channel.name === 'logs').send(
          {
              embed: {
                  title: 'Bot Online',
                  color: '#990000',
                  image: { url: null },

                  description: 'BestBot is online! :)',
                  footer: { text: 'Created by midsummerred32' },
                  thumbnail: { url: null }

              }
          }
      );

          while(s4d.client && s4d.client.token) {
              await delay(50);
                s4d.client.user.setActivity(String('my mixtape'));
    await delay(Number(2)*1000);
    s4d.client.user.setActivity(String('discord 404 game'));
    await delay(Number(2)*1000);
    s4d.client.user.setActivity(String('raid shadow legends'));
    await delay(Number(2)*1000);
    s4d.client.user.setActivity(String('made in scratch'));
    await delay(Number(2)*1000);

              console.log('ran')
          }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'hey') {
    s4dmessage.channel.send(String('Hey!'));
    s4dmessage.react('👍');}
  if ((s4dmessage.content) == '!ping') {
    s4dmessage.channel.send(String((['Pong!: ',s4d.client.ws.ping,'ms'].join(''))));
  }
  if ((s4dmessage.content) == '!serverinfo') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: ((s4dmessage.guild).name),
                    color: '#990000',
                    image: { url: ((s4dmessage.guild).iconURL({ dynamic: true })) },

                    description: (['Server Owner: ',(s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID),'\n','Member Count: ',(s4dmessage.guild).memberCount].join('')),
                    footer: { text: 'Created by midsummerred32' },
                    thumbnail: { url: null }

                }
            }
        );
  }
  if ((s4dmessage.content) == '!hitman') {
    (s4dmessage.channel).send(String('Where would you like the hitman dispatched?  '));
    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
       s4dmessage.channel.send(String((['Sending hitman to ',s4d.reply,'.'].join(''))));
      await delay(Number(30)*1000);
      s4dmessage.channel.send(String((['',s4dmessage.member,', hitman is en route.'].join(''))));

     s4d.reply = null; }).catch(async (e) => { console.error(e);  });}
  if ((s4dmessage.member) != (((s4dmessage.guild).members.cache.get('872229532986384424') || await (s4dmessage.guild).members.fetch('872229532986384424')))) {
    s4d.client.channels.cache.find((channel) => channel.name === 'logs').send(
            {
                embed: {
                    title: 'New Message!',
                    color: '#990000',
                    image: { url: null },

                    description: ([s4dmessage.content,' by ',s4dmessage.member].join('')),
                    footer: { text: null },
                    thumbnail: { url: null }

                }
            }
        );
  }

});

                s4d;
            