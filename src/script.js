const buttonNext = document.querySelectorAll('.form_button');
const buttonBack = document.querySelectorAll('.block-content-form_button-back');
const radioButton = document.querySelectorAll('.radio');
const form = document.querySelector('.block-content-form');
const count = form.length-1;
let i = 0;

function removeAdd() {
	document.querySelectorAll('.block-content-form')[i].classList.remove('active');
	if(i == form.length) {
		i = 0;
	} else {
		i++;
	}
	document.querySelectorAll('.block-content-form')[i].classList.add('active');
}

function clickRadioButton() {
		if (radioButton.checked = true) {
			buttonNext[i].classList.add('button-active');
			removeAdd();
		}
	}

	function buttonCLickBack() {
		document.querySelectorAll('.block-content-form')[i].classList.remove('active');
		 if(i == 0) {
    i = 3;
  	} else {
    	i--
  	}
			document.querySelectorAll('.block-content-form')[i].classList.add('active');
		}

	function buttonCLickNext() {
		removeAdd();
		}

		function getData() {
			const requestURL = '#';
			const xhr = new XMLHttpRequest();
			xhr.open('POST', requestURL);
			xhr.onload = () => {
				alert('Данные полностью загружены на сервер!');
				}
				xhr.send();
			}
		
		document.querySelector('.send-button').addEventListener('click', () => {
			getData();
		});

	radioButton.forEach((radioButtons) => {
		radioButtons.addEventListener('change', clickRadioButton);
	});

	buttonNext.forEach((nextButton) => {
		nextButton.addEventListener('click', buttonCLickNext);
	});

	buttonBack.forEach((backButton) => {
		backButton.addEventListener('click', buttonCLickBack);
});

