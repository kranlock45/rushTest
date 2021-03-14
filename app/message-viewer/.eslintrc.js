module.exports = {
	extends: ['airbnb-typescript-prettier'],
	plugins: ['simple-import-sort'],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	rules: {
		'import/no-cycle': 0,
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,

		'@typescript-eslint/ban-types': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-empty-interface': 0,

		'react/jsx-props-no-spreading': 0,
		'react/no-array-index-key': 0,
		'react/destructuring-assignment': 0,
		'react/state-in-constructor': 0,
		'react-hooks/exhaustive-deps': 0,
		'react/require-default-props': 0,
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',

		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,

		'no-void': 0,
		'no-shadow': 0,
		'consistent-return': 0,
		'newline-before-return': 'error',

		'simple-import-sort/sort': 'error',
		'sort-imports': 'off',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'func-names': 0,
	},
	// Продвинутая сортировка по модулям и в алфавитном порядке.
	overrides: [
		{
			files: ['*.ts*'],
			rules: {
				'simple-import-sort/sort': [
					'error',
					{
						groups: [
							[
								'^react',
								'^@?\\w',
								'^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)',
								'^@redux-saga/.+',
								'^@cib/.+',
								'^@atomic/.+',
								'^\\$+',
								'^\\.\\.(?!/?$)',
								'^\\.\\./?$',
								'^\\./(?=.*/)(?!/?$)',
								'^\\.(?!/?$)',
								'^\\./?$',
								'^.+\\.s?css$',
							],
						],
					},
				],
			},
		},
	],
};
