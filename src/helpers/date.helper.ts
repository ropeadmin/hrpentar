export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth(); // Months are zero-based
  const year = date.getUTCFullYear();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[month];

  return `${monthName} ${day}, ${year}`;
};

export const formatBankCardDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = String(date.getUTCFullYear()).slice(-2); // Get the last two digits of the year

  return `${month}/${year}`;
};

export const formatDate2 = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Ensure two digits, months are zero-based so add 1
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
};



export const formatDateTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedTime = `${formattedHours
    .toString()
    .padStart(2, "0")}:${minutes} ${period}`;
  return formattedTime;
};
