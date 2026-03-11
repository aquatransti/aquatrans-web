// Serviço de envio de emails
// Em produção, configurar com credenciais reais do Gmail ou outro provedor

const nodemailer = require('nodemailer');

// Configuração do transportador
// Em desenvolvimento, usa ethereal.email (emails fake para teste)
// Em produção, usar Gmail, SendGrid, etc.
let transporter = null;

const initializeTransporter = async () => {
  if (process.env.NODE_ENV === 'production' && process.env.EMAIL_USER) {
    // Produção - usar credenciais reais
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Desenvolvimento - usar ethereal (emails de teste)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('📧 Email de teste configurado. Visualize em: https://ethereal.email');
    console.log('   Usuário:', testAccount.user);
  }
};

// Template de email de convite
const getInviteEmailHTML = (nome, token, role) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const link = `${frontendUrl}/finalizar-cadastro?token=${token}`;
  
  const roleLabels = {
    aluno: 'Aluno(a)',
    admin_professor: 'Professor(a)',
    admin_juridico: 'Equipe Jurídica',
    admin_contabil: 'Equipe Contábil',
    admin_psicossocial: 'Equipe Psicossocial',
    admin_ti: 'Equipe de TI',
    gestor: 'Gestor(a)'
  };
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vinde ao Aquatrans!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <!-- Header com gradiente trans -->
        <div style="background: linear-gradient(135deg, #5BCEFA 0%, #F5A9B8 100%); height: 8px; border-radius: 8px 8px 0 0;"></div>
        
        <!-- Conteúdo -->
        <div style="background: #ffffff; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; font-size: 28px; margin: 0;">
              🏳️‍⚧️ Aquatrans
            </h1>
            <p style="color: #5a5a7a; margin-top: 8px;">
              Associação para pessoas trans e não-binárias
            </p>
          </div>
          
          <!-- Mensagem -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a2e; font-size: 22px; margin-bottom: 16px;">
              Olá, ${nome}! 👋
            </h2>
            
            <p style="color: #3d3d5c; font-size: 16px; line-height: 1.7;">
              Temos uma ótima notícia! Seu cadastro no <strong>Aquatrans</strong> foi 
              <span style="color: #28a745; font-weight: bold;">aprovado</span>!
            </p>
            
            <p style="color: #3d3d5c; font-size: 16px; line-height: 1.7;">
              Você foi cadastrade como: <strong style="color: #5BCEFA;">${roleLabels[role] || role}</strong>
            </p>
            
            <p style="color: #3d3d5c; font-size: 16px; line-height: 1.7;">
              Para finalizar seu cadastro e criar sua senha de acesso, clique no botão abaixo:
            </p>
          </div>
          
          <!-- Botão -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${link}" 
               style="display: inline-block; background: linear-gradient(135deg, #5BCEFA 0%, #F5A9B8 100%); 
                      color: #ffffff; text-decoration: none; padding: 16px 40px; 
                      border-radius: 8px; font-size: 18px; font-weight: bold;
                      box-shadow: 0 4px 12px rgba(91, 206, 250, 0.4);">
              Finalizar Cadastro
            </a>
          </div>
          
          <!-- Link alternativo -->
          <p style="color: #5a5a7a; font-size: 14px; line-height: 1.6; word-break: break-all;">
            Ou copie e cole este link no navegador:<br>
            <a href="${link}" style="color: #5BCEFA;">${link}</a>
          </p>
          
          <!-- Aviso -->
          <div style="background: #fff8e6; border-left: 4px solid #ffc107; padding: 16px; margin-top: 24px; border-radius: 4px;">
            <p style="color: #856404; font-size: 14px; margin: 0;">
              ⚠️ Este link é válido por <strong>7 dias</strong>. Após esse período, será necessário solicitar um novo convite.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e1e5eb;">
            <p style="color: #5a5a7a; font-size: 14px; text-align: center; margin: 0;">
              Se você não solicitou este cadastro, por favor ignore este email.
            </p>
            <p style="color: #5a5a7a; font-size: 14px; text-align: center; margin-top: 16px;">
              💙🩷🤍🩷💙
            </p>
            <p style="color: #9199a8; font-size: 12px; text-align: center; margin-top: 8px;">
              © 2026 Aquatrans - Todos os direitos reservados
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Template de email de rejeição
const getRejectionEmailHTML = (nome, motivo) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aquatrans - Atualização do seu cadastro</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <div style="background: linear-gradient(135deg, #5BCEFA 0%, #F5A9B8 100%); height: 8px; border-radius: 8px 8px 0 0;"></div>
        
        <div style="background: #ffffff; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; font-size: 28px; margin: 0;">
              🏳️‍⚧️ Aquatrans
            </h1>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a2e; font-size: 22px; margin-bottom: 16px;">
              Olá, ${nome}!
            </h2>
            
            <p style="color: #3d3d5c; font-size: 16px; line-height: 1.7;">
              Agradecemos seu interesse no Aquatrans. Infelizmente, não foi possível aprovar 
              seu cadastro neste momento.
            </p>
            
            ${motivo ? `
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #3d3d5c; font-size: 14px; margin: 0;">
                <strong>Motivo:</strong> ${motivo}
              </p>
            </div>
            ` : ''}
            
            <p style="color: #3d3d5c; font-size: 16px; line-height: 1.7;">
              Se você tiver dúvidas ou quiser mais informações, entre em contato conosco 
              através do nosso Instagram 
              <a href="https://www.instagram.com/aquatrans.oficial/" style="color: #5BCEFA;">@aquatrans.oficial</a>.
            </p>
          </div>
          
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e1e5eb;">
            <p style="color: #5a5a7a; font-size: 14px; text-align: center;">
              💙🩷🤍🩷💙
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Enviar email de convite
const sendInviteEmail = async (to, nome, token, role) => {
  if (!transporter) {
    await initializeTransporter();
  }
  
  const mailOptions = {
    from: '"Aquatrans" <noreply@aquatrans.org.br>',
    to,
    subject: '🏳️‍⚧️ Bem-vinde ao Aquatrans! Finalize seu cadastro',
    html: getInviteEmailHTML(nome, token, role)
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email enviado:', info.messageId);
    
    // Em desenvolvimento, mostra o link para visualizar o email
    if (process.env.NODE_ENV !== 'production') {
      console.log('   Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error: error.message };
  }
};

// Enviar email de rejeição
const sendRejectionEmail = async (to, nome, motivo) => {
  if (!transporter) {
    await initializeTransporter();
  }
  
  const mailOptions = {
    from: '"Aquatrans" <noreply@aquatrans.org.br>',
    to,
    subject: 'Aquatrans - Atualização do seu cadastro',
    html: getRejectionEmailHTML(nome, motivo)
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email de rejeição enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  initializeTransporter,
  sendInviteEmail,
  sendRejectionEmail
};
