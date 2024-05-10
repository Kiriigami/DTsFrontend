export const greetUser = () => {
  const currDate = new Date();
  const hrs = currDate.getHours();
  let greeting = "";

  if (hrs < 12) {
    greeting = "Good Morning";
  } else if (hrs >= 12 && hrs <= 17) {
    greeting = "Good Afternoon";
  } else if (hrs >= 17 && hrs <= 24) {
    greeting = "Good Evening";
  }

  return greeting;
};
