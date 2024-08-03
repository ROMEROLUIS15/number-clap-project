const VerifyCodeSended = require('../models/VerifyCodeSended.js');
const catchError = require('../utils/catchError.js');

const verifyCodeFromRegister = catchError(async (req, res) => {
    const { email, code } = req.body;

    const emailRecord = await VerifyCodeSended.findOne({ where: { email } });
    const codeRecord = await VerifyCodeSended.findOne({ where: { code, email } });

    // console.log('Email Record:', emailRecord);
    // console.log('Code Record:', codeRecord);

    if (emailRecord && codeRecord) {
        await codeRecord.destroy(); // Elimina el registro del código después de verificar
        return res.status(200).send('Code successfully verified.');
    }

    return res.status(400).send('Incorrect verification code or email.');
});


module.exports = verifyCodeFromRegister