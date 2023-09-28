export const getStyles = () => {
    const styles = {
        menuList: (base: any) => ({
            ...base,
            "::-webkit-scrollbar": {
                width: "10px",
                height: "50px",
            },
            "::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: '5px',
            },
            "::-webkit-scrollbar-thumb": {
                background: "#FA5897",
                borderRadius: '3px',
                height: '20px'
            },
        })
    }
    return styles
}