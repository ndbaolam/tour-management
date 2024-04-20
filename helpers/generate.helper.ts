export const generateRandomString = (length: number): string => {
    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    let result: string = "";
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
};

export const generateRandomNumber = (length: number): string => {
  const characters: string = "0123456789";

  let result: string = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

// Generate Mã đơn hàng
export const generateOrderCode = (number: number): string => {
  const code = `OD${String(number).padStart(8, '0')}`;
  return code;
};

// Generate Mã tour
export const generateTourCode = (number: number): string => {
  const code = `TOUR${String(number).padStart(6, '0')}`;
  return code;
};
