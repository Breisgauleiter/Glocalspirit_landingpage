    .menu__toggle:checked ~ .header__nav {
        display: flex;
        flex-flow: column nowrap;
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 250px;
        background-color: rgba(247, 247, 247, 0.025);
        padding: 1rem;
        z-index: 999;
        transform: translateX(0);
        transition: transform 0.5s ease-in-out;
        justify-content: flex-start;
    }