
// import jwt from "jsonwebtoken";

// export const generateToken = (id: string, role: string) => {
//   return jwt.sign(
//     {
//       id,
//       role,
//       iat: Date.now(),   
//       nonce: Math.random() 
//     },
//     process.env.JWT_SECRET as string,
//     { expiresIn: "7d" }
//   );
// };


import jwt from "jsonwebtoken";

export const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};