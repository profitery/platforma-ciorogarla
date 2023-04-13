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

registerSW({
	immediate: true,
})

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

// @ts-ignore
self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.MODE === "development";

render(() => 
	<MetaProvider>
		<FirebaseProvider config={firebaseConfig}>
			<Router>
				<App />
			</Router>
		</FirebaseProvider>
	</MetaProvider>
, root!);
