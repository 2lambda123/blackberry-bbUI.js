/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function displayCheckedItems() {
	var text = '';
	if (document.getElementById('checkOne').checked) {
		text = document.getElementById('checkOne').value;
	}
	if (document.getElementById('checkTwo').checked) {
		text = (text.length > 0) ? text + ' &amp; ' : text;
		text = text + document.getElementById('checkTwo').value;
	}
	if (document.getElementById('checkThree').checked) {
		text = (text.length > 0) ? text + ' &amp; ' : text;
		text = text + document.getElementById('checkThree').value;
	}
	if (!document.getElementById('checkOne').checked && !document.getElementById('checkTwo').checked && !document.getElementById('checkThree').checked) {
		text = 'none';
	}
	document.getElementById('value').innerHTML = text;
}

function enableCheckboxes() {
	document.getElementById('checkOne').enable();
	document.getElementById('checkTwo').enable();
	document.getElementById('checkThree').enable();
}

function disableCheckboxes() {
	document.getElementById('checkOne').disable();
	document.getElementById('checkTwo').disable();
	document.getElementById('checkThree').disable();
}

function showCheckboxes() {
	document.getElementById('checkOne').show();
	document.getElementById('checkTwo').show();
	document.getElementById('checkThree').show();
}

function hideCheckboxes() {
	document.getElementById('checkOne').hide();
	document.getElementById('checkTwo').hide();
	document.getElementById('checkThree').hide();
}

function removeCheckboxes() {
	document.getElementById('checkOne').remove();
	document.getElementById('checkTwo').remove();
	document.getElementById('checkThree').remove();
}