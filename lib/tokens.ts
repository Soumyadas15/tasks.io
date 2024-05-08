import { getVerificationTokenByEmail } from '@/data/verification-token';
import { randomBytes } from 'crypto';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';

function generateRandomCode(): string {
    const characters = '0123456789';
    const codeLength = 6;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(randomBytes(1).readUInt8(0) / 256 * characters.length);
        code += characters[randomIndex];
    }

    return code;
}

export const generateVerificationToken = async(
    email: string
) => {
    const token = generateRandomCode();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email: email,
            token: token,
            expires: expires,
        }
    })

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return verificationToken;
}