
function inDepthTutorial()
{
	const request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/1299320952953241600/2SEKripkdeGwvQORf_HkWbd_ewS_T8QYzYGUEFYvmcr76gxvcRyhZ3DGor4TxmSptJx8");

	request.setRequestHeader('Content-type', 'application/json');

	const params = {
		"username": "CORE Rickroll Notifier",
		"avatar_url": "",
		"content": "Someone clicked the in-depth tutorial button and got rickrolled!"
	  }

	request.send(JSON.stringify(params));

	console.log("Rickrolled!");

	window.location.href = "https://youtu.be/dQw4w9WgXcQ"
}
