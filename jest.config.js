module.exports = {
	roots: ['<rootDir>/'],
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(css|less)$': '<rootDir>/__mocks__/style-mock.ts',
	},
	setupFiles: ['<rootDir>/jest/set-env-vars.js'],
	// Runs special logic, such as cleaning up components
	// when using React Testing Library and adds special
	// extended assertions to Jest
	setupFilesAfterEnv: ['<rootDir>/jest/test-setup.ts'],
	// Module file extensions for importing
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'^.+\\.svg': '<rootDir>/__mocks__/svgr-mock.ts',
		'^.+\\.png': '<rootDir>/__mocks__/png-mock.ts',
		'@components/(.*)': '<rootDir>/components/$1',
		'@constants/(.*)': '<rootDir>/constants/$1',
		'@assets/(.*)': '<rootDir>/public/assets/$1',
		'@contexts/(.*)': '<rootDir>/contexts/$1',
		'@services/(.*)': '<rootDir>/services/$1',
		'@utils/(.*)': '<rootDir>/utils/$1',
		'@models/(.*)': '<rootDir>/models/$1',
		'@hooks/(.*)': '<rootDir>/hooks/$1',
		'@mocks/(.*)': '<rootDir>/mocks/$1',
	},
	globals: {
		// we must specify a custom tsconfig for tests because we need the typescript transform
		// to transform jsx into js rather than leaving it jsx such as the next build requires.  you
		// can see this setting in tsconfig.jest.json -> "jsx": "react"
		'ts-jest': {
			tsconfig: '<rootDir>/jest/tsconfig.jest.json',
		},
	},
};
