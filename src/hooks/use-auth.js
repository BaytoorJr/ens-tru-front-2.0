export function useAuth() {
    const token = document.cookie

    return {
        isAuth: !!token
    }
}