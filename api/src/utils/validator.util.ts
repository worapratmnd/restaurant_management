const isNonEmptyObject = <T>(obj: T) => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  } else {
    return false;
  }
};
const isNonEmptyArray = (arr: any) => {
  if (arr && Array.isArray(arr) && arr.length > 0) {
    return true;
  } else {
    return false;
  }
};
const isNonEmptyString = (value: string) => {
  if (value && value.trim() !== '') {
    return true;
  } else {
    return false;
  }
};
const isValidEmail = (email: string) => {
  if (isNonEmptyString(email)) {
    return !!email.match(
      // eslint-disable-next-line no-useless-escape
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i
    );
  } else {
    return false;
  }
};
const isValidPhoneNumber = (number: string) => {
  if (number) {
    number = number.toString();
    const phoneNum = number.replace(/[^\d]/g, '');
    if (phoneNum.length >= 3 && phoneNum.length <= 13) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const isNumericAndPositive = (n: number) => {
  return (
    !isNaN(parseFloat(n.toString())) &&
    isFinite(n) &&
    parseFloat(n.toString()) >= 0
  );
};

export default {
  isNonEmptyObject,
  isNonEmptyArray,
  isValidEmail,
  isValidPhoneNumber,
  isNonEmptyString,
  isNumericAndPositive
};
