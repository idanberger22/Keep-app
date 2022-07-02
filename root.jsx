import { KeepMain } from './app-keep.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader/>
            <Switch>
                <Route path="/" component={KeepMain} />
            </Switch>
            <AppFooter/>
            </section>
    </Router>
}
