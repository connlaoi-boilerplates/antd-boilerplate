export const randomGreeting = username => {
  const greetings = [
    `Hello, ${username}!`,
    `Welcome, ${username}!`,
    `Bienvenue, ${username}!`,
    `Welkom, ${username}!`,
    ` أهلاً و سهلاً, ${username}!`,
    `ようこそ, ${username}!`,
    `こんにちは, ${username}!`,
    `Hoan nghênh, ${username}!`
  ];
  let greeting = greetings[Math.floor(Math.random() * greetings.length)];
  return greeting;
};
