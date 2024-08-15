import './index.css';
import './i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/Router';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<TooltipProvider>
			<Router />
			<Toaster />
		</TooltipProvider>
	</React.StrictMode>
);
