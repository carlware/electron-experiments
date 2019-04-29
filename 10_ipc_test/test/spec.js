const electron = require('electron');
const Application = require('spectron').Application;
const expect = require('chai').expect;

describe('Spectorn example', function() {
	this.timeout(20000); //10 seconds
	global.app = null;

	//starts the application before all the test in this block
	before(() => {
		//create the electron app
		app = new Application({
			path: electron,
			args: ['.']
		});
		//start the electron app
		return app.start().then(() => {
			app.client.waitUntilWindowLoaded();
			app.browserWindow.show();
			return app;
		});
	});

	//stop th electron application after all the test
	after(() => {
		if (app && app.isRunning()) {
			return app.stop();
		}
	});

	it('should open the browserwindow', () => {
		return app.client
			.waitUntilWindowLoaded()
			.browserWindow.isVisible()
			.then(res => {
				console.log('visible: ', res);
				expect(res).to.be.equal(true);
			})
			.browserWindow.isFocused()
			.then(res => {
				console.log('isFocused: ', res);
				expect(res).to.be.equal(true);
			})
			.browserWindow.isMinimized()
			.then(res => {
				console.log('isMinimized: ', res);
				expect(res).to.be.equal(false);
			})
			.browserWindow.isDevToolsOpened()
			.then(res => {
				console.log('isDevToolsOpened: ', res);
				expect(res).to.be.equal(false);
			});
	});
	it('should open the browserwindow with correct size', () => {
		return app.client
			.waitUntilWindowLoaded()
			.browserWindow.getBounds()
			.then(res => {
				expect(res.width).to.be.equal(800);
				expect(res.height).to.be.equal(600);
			});
	});
	it('should communicate with main process and renderer process', async () => {
		const results = await app.client.waitUntilWindowLoaded();
		const text = await app.client.getText('#greet');
		expect(text).to.equal('');
		await app.client.click('#greetButton');
		const greetText = await app.client.getText('#greet');
		expect(greetText).to.equal('Hello Jane');
		return results;
		// return app.client.waitUntilWindowLoaded()
		// 	.then(() => {
		// 		return app.client.getText('#greet');
		// 	})
		// 	.then(greetElementTxt => {
		// 		expect(greetElementTxt).to.equal('');
		// 	})
		// 	.then(() => {
		// 		return app.client.click('#greetButton');
		// 	})
		// 	.then(() => {
		// 		return app.client.getText('#greet');
		// 	})
		// 	.then(greetElementTxt => {
		// 		expect(greetElementTxt).to.equal('Hello Jane');
		// 	});
	});
});
