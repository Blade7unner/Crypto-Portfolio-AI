const { OpenAI } = require('openai');
//console.log(process.env);
// Load your OpenAI API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

module.exports = {
    sendMessageToAI: async (req,res) => {
        // Send message to OpenAI and get response
        const { message } = req.body;
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Respond to me as if you are a cryptocurrency expert." },
                    { role: "user", content: message }
                ]
            });
            return res.send(response.choices[0].message.content);
        } catch (error) {
            console.error("Error calling OpenAI:", error);
            return res.status(500).send(error.message);
        }
    }
};
