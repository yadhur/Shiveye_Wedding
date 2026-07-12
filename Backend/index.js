require('dotenv').config();
const express = require('express');
const nodemailer = require("nodemailer");
const cors =require('cors');


const router = express.Router();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       
    port: 587,                              
    secure: false,                         
    auth: {
      user: process.env.SMTP_USER,      
      pass: process.env.SMTP_PASS,      
    },
  });


const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.get('/', (req, res) => {
    res.send('Server Running');
  });

 // routes/contact.js — POST /api/contact
router.post("/api/contact", async (req, res) => {
    const { name, email, phone, type, message } = req.body;
  
    // Basic validation
    if (!name || !email || !phone || !message || !type) {
      return res
        .status(400)
        .json({ error: "Name, email, phone, type and message are required." });
    }
  
    // Friendly label for the project type stored as a slug (e.g. "pre-wedding")
    const TYPE_LABELS = {
      wedding: "Wedding Photography",
      "pre-wedding": "Pre-Wedding",
      "baby-shower": "Baby Shower",
      engagement: "Engagement",
      other: "Other",
    };
    const typeLabel = TYPE_LABELS[type] || type;
  
    const submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });
    function buildContactEmailHtml({ name, email, phone, typeLabel, message, submittedAt }) {
        const safeMessage = message.replace(/\n/g, "<br/>");
        const phoneHref = phone.replace(/\s/g, "");
      
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Enquiry — Shiveye Wedding</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f0eee8; font-family: Georgia, 'Times New Roman', serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0eee8; padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      
                <!-- Header -->
                <tr>
                  <td style="background-color:#2f4034; padding:36px 40px 30px 40px;" align="center">
                    <p style="margin:0; color:#c8a96e; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:4px; text-transform:uppercase; font-weight:400;">
                      Shiveye Wedding
                    </p>
                    <h1 style="margin:10px 0 0 0; color:#ffffff; font-family: Georgia, 'Times New Roman', serif; font-size:26px; font-weight:400; letter-spacing:0.5px;">
                      New Website Enquiry
                    </h1>
                  </td>
                </tr>
      
                <!-- Gold divider -->
                <tr>
                  <td style="height:3px; background-color:#c8a96e; line-height:3px; font-size:3px;">&nbsp;</td>
                </tr>
      
                <!-- Meta strip -->
                <tr>
                  <td style="background-color:#faf8f4; padding:14px 40px; border-bottom:1px solid #ece7dc;">
                    <p style="margin:0; color:#9c8f7e; font-family: Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:1px;">
                      Received ${submittedAt}
                    </p>
                  </td>
                </tr>
      
                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px 10px 40px;">
      
                    <!-- Detail rows -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:18px;" width="120" valign="top">
                          <p style="margin:0; color:#9c8f7e; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Name</p>
                        </td>
                        <td style="padding-bottom:18px;" valign="top">
                          <p style="margin:0; color:#1a1814; font-family: Georgia, serif; font-size:16px;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:18px; border-top:1px solid #f0eee8; padding-top:18px;" width="120" valign="top">
                          <p style="margin:0; color:#9c8f7e; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Email</p>
                        </td>
                        <td style="padding-bottom:18px; border-top:1px solid #f0eee8; padding-top:18px;" valign="top">
                          <a href="mailto:${email}" style="color:#2f4034; font-family: Georgia, serif; font-size:16px; text-decoration:none; border-bottom:1px solid #c8a96e;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:18px; border-top:1px solid #f0eee8; padding-top:18px;" width="120" valign="top">
                          <p style="margin:0; color:#9c8f7e; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Phone</p>
                        </td>
                        <td style="padding-bottom:18px; border-top:1px solid #f0eee8; padding-top:18px;" valign="top">
                          <a href="tel:${phoneHref}" style="color:#2f4034; font-family: Georgia, serif; font-size:16px; text-decoration:none; border-bottom:1px solid #c8a96e;">${phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:18px; border-top:1px solid #f0eee8; padding-top:18px;" width="120" valign="top">
                          <p style="margin:0; color:#9c8f7e; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Project</p>
                        </td>
                        <td style="padding-bottom:18px; border-top:1px solid #f0eee8; padding-top:18px;" valign="top">
                          <span style="display:inline-block; background-color:#f0eee8; color:#2f4034; font-family: Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:0.5px; padding:5px 12px; border-radius:2px; border:1px solid #c8a96e;">
                            ${typeLabel}
                          </span>
                        </td>
                      </tr>
                    </table>
      
                    <!-- Message -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                      <tr>
                        <td style="border-top:1px solid #f0eee8; padding-top:22px;">
                          <p style="margin:0 0 10px 0; color:#9c8f7e; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Message</p>
                          <p style="margin:0; color:#3a352c; font-family: Georgia, serif; font-size:15px; line-height:1.7;">
                            ${safeMessage}
                          </p>
                        </td>
                      </tr>
                    </table>
      
                  </td>
                </tr>
      
                <!-- CTA -->
                
                    </table>
                  </td>
                </tr>
      
                <!-- Footer -->
                <tr>
                  <td style="background-color:#faf8f4; padding:20px 40px; border-top:1px solid #ece7dc;" align="center">
                    <p style="margin:0; color:#b5ab9c; font-family: Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:1px;">
                      This enquiry was submitted via the Shiveye Wedding contact form.
                    </p>
                  </td>
                </tr>
      
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
        `.trim();
      }
  
    try {
      await transporter.sendMail({
        from: `"Shiveye Wedding" <${process.env.FROM_EMAIL}>`, // must be SES-verified
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New Enquiry — ${typeLabel} — ${name}`,
        text:'New Enquiry',
        html: buildContactEmailHtml({ name, email, phone, typeLabel, message, submittedAt }),
      });
  
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Email send failed:", err);
      res
        .status(500)
        .json({ error: "Failed to send message. Please try again later." });
    }
  });
  
  /**
   * Builds a clean, professional HTML email matching the Shiveye Wedding
   * brand (deep sage green + gold + warm cream), with a structure that
   * renders reliably across email clients (table-based layout, inline
   * styles only — no external CSS, no flexbox/grid).
   */


app.use(router);

app.listen(3000,()=>{
    console.log('Server is running on 3000');
    
})

