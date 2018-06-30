// JavaScript Document
function main() {
	var theWord = document.getElementById("word").value;
	
	
	if (!isNotaNumber(theWord)) {
		alert("Enter only words please.");
	} else if (hasWhiteSpace(theWord)) {
		alert("Enter only one word please.")
	} else {
		var value = getValueOfWord(theWord);
		document.getElementById("output").innerHTML = "The value: " + value;
		
		function getValueOfWord(word) {
			word = word.toUpperCase();
			var score = 0;
			for (var i = 0; i < word.length; i++) {
				switch (word[i]) {
					case 'Q':
					case 'Z':
						score += 10;
						break;
					case 'J':
					case 'X':
						score += 8;
						break;
					case 'K':
						score += 5;
						break;
					case 'F':
					case 'H':
					case 'V':
					case 'W':
					case 'Z':
						score = +4;
						break;
					case 'B':
					case 'C':
					case 'M':
					case 'P':
						score += 3;
						break;
					case 'D':
					case 'G':
						score += 2;
						break;
					default:
						score += 1;
				}
			}
			return score;
		}
	}

	function isNotaNumber(inputString) {
		return isNaN(inputString);
	}

	function hasWhiteSpace(s) {
		return /\s/g.test(s);
	}

	function getWordValue(string) {
		
	}
}