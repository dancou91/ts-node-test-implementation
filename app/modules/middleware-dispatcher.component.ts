/**
 * 'next' function, passed to a middleware
 */
export type Next = () => void | Promise<void>;

/**
 * A middleware
 */
export type Middleware<T> = (context: T, next: Next) => Promise<void> | void;

export type MyContext = {
    a: number;
}

/**
 * A middleware container and invoker
 */
export class MwDispatcher<T> {

    middlewares: Middleware<T>[];

    constructor() {
        this.middlewares = [];
    }

    /**
     * Add a middleware function.
     */
    use(...mw: Middleware<T>[]): void {
        this.middlewares.push(...mw);
    }

    /**
     * Execute the chain of middlewares, in the order they were added on a
     * given Context. 
     */
    dispatch(context: T): Promise<void> {
        return invokeMiddlewares(context, this.middlewares)
    }
}

/**
 * Helper function for invoking a chain of middlewares on a context.
 */
async function invokeMiddlewares<T>(context: T, middlewares: Middleware<T>[]): Promise<void> {

    if (!middlewares.length) return;

    const mw = middlewares[0];

    return mw(context, async () => {
        await invokeMiddlewares(context, middlewares.slice(1));
    })

}

/**
 * Creating the application object
 */
const app = new MwDispatcher<MyContext>();

/**
 * A middleware
 */
app.use((context: MyContext, next: Next) => {
    context.a += 1;
    return next();
});

/**
 * An async middleware
 */
app.use(async (context: MyContext, next: Next) => {
    // wait 2 seconds
    await new Promise(res => setTimeout(res, 2000));
    context.a += 2;
    return next();
});

export default app;

// import app, { MwDispatcher, MyContext } from "./component/middleware-dispatcher.component";

// // ==========================================================
// (async () => {

//     const context: MyContext = {
//         a: 0,
//     };

//     await app.dispatch(context);
//     console.log(context.a); // should emit 3
// })();
// // ==========================================================