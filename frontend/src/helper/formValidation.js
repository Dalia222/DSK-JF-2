function camelcaseToNormalString(word) {
  var normalString = word.replace(/([a-z])([A-Z])/g, "$1 $2");
  return normalString.toLowerCase();
}

function capitalizeFirstLetter(sentence) {
  var words = sentence.split(" "); // Split the sentence into an array of words
  var capitalizedWords = words.map(function (word) {
    // Capitalize the first letter of each word
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" "); // Join the words into a sentence
}

const formValidation = (form) => {
  for (let input of Array.from(form.elements)) {
    if (
      input.value === "" &&
      input.value !== "submit" &&
      input.value !== "Submit"
    ) {
      let errorMessage = camelcaseToNormalString(input.name);
      errorMessage = capitalizeFirstLetter(errorMessage);
      errorMessage += " is required";
      return errorMessage === " is required" ? false : errorMessage;
    }
  }
};

export default formValidation;
