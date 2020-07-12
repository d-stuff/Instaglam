describe('serverResponse util', () => {
	it('should return status code', () => {
		const serverResponse = require('../../serverResponse')

		const values = {}

		const res = {
			status(status) {
				values.status = status;
				return this;
			},
			json() {
				return this;
			},
			end() {
				return this;
			}
		}

		serverResponse(res, 444);
		expect(values.status).toBe(444)
	})
	it('should return status message', () => {
		const serverResponse = require('../../serverResponse')

		const values = {}

		const res = {
			status(status) {
				values.status = status;
				return this;
			},
			json(msg) {
				values.json = msg;
				return this;
			},
			end() {
				return this;
			}
		}

		serverResponse(res, 444, 'json message');
		expect(values.json).toBe('json message')
	})
})
