/* @refresh reload */
import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import "@fontsource/montserrat";
import "./global.css";

import App from './App';
import { registerSW } from "virtual:pwa-register";
import {FirebaseProvider} from 'solid-firebase';
import {firebaseConfig} from './lib/firebaseConfig';
import {DEV} from './lib/dev';
import {BUSINESS_STANDALONE_MODE} from './pages/Businesses/Business';

if (!DEV || BUSINESS_STANDALONE_MODE)
	registerSW({
		immediate: true,
	});

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
	);
}


render(() => 
	<MetaProvider>
		<FirebaseProvider config={firebaseConfig}>
			<Router>
				<App />
			</Router>
		</FirebaseProvider>
	</MetaProvider>
, root!);
