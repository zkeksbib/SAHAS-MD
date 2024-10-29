const yts = require('yt-search');
const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "yts",
    alias: ["youtubesearch", "ytsearch"],
    desc: "Search for YouTube videos",
    category: "search",
    react: "🔍",
    filename: __filename,
    use: '<search query>'
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args[0]) return reply('Please provide a search query !');

    const query = args.join(' ');

    try {
        const results = await yts(query);
        
        if (!results.videos.length) {
            return reply('No videos found for the given query.');
        }

        let response = '*YouTube Search Results:*\n\n';
        results.videos.slice(0, 20).forEach((video, index) => {
            response += `${index + 1}. *${video.title}*\n`;
            response += `   Channel: ${video.author.name}\n`;
            response += `   Duration: ${video.duration.timestamp}\n`;
            response += `   Views: ${formatNumber(video.views)}\n`;
            response += `   Uploaded: ${video.ago}\n`;
            response += `   Link: ${video.url}\n\n`;
        });

        response += `\nShowing top 20 results for "${query}"\n`;
        response += `To watch, click on the video link or use the command:\n`;

         // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: response,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '👾 ＳＡＨＡＳ  |   𝚃𝙴𝙲𝙷 ジ',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `SAHAS-MD Youtube Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: `https://pomf2.lain.la/f/gmsubn6.png`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
    } catch (error) {
        console.error('Error in YouTube search:', error);
        reply('❌ An error occurred while searching YouTube. Please try again later.');
    }
});

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}


cmd({
    pattern: "srepo",
    desc: "Fetch information about a GitHub repository.",
    category: "search",
    react: "📁",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const repo = args.join(' ');
        if (!repo) {
            return reply("Please provide a GitHub repository name in the format `owner/repo`.");
        }

        const apiUrl = `https://api.github.com/repos/${repo}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let repoInfo = `📁_*GitHub Repository Info*_📁\n\n`;
        repoInfo += `📌 *Name*: ${data.name}\n`;
        repoInfo += `🔗 *URL*: ${data.html_url}\n`;
        repoInfo += `📝 *Description*: ${data.description}\n`;
        repoInfo += `⭐ *Stars*: ${data.stargazers_count}\n`;
        repoInfo += `🍴 *Forks*: ${data.forks_count}\n`;
        repoInfo += `\n`;
        repoInfo += `> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*\n`;

         // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: repoInfo,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '👾 ＳＡＨＡＳ  |   𝚃𝙴𝙲𝙷 ジ',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `SAHAS-MD Github Repository Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: `https://pomf2.lain.la/f/5fz9fk69.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`єяяσя ƒєт¢нιηg яєρσѕιтσяу ιηƒσ: ${e.message}`);
    }
});
