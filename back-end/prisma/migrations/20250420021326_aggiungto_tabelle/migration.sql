-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `note` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Studio` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `indirizzo` VARCHAR(191) NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Utente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `ruolo` ENUM('ADMIN', 'TATUATORE', 'COLLABORATORE', 'RECEPTIONIST', 'PIERCER', 'APPRENDISTA') NOT NULL,
    `studioId` INTEGER NOT NULL,

    UNIQUE INDEX `Utente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servizio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `prezzo` DOUBLE NOT NULL,
    `durata` INTEGER NOT NULL,
    `studioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appuntamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `durata` INTEGER NOT NULL,
    `stato` ENUM('PROGRAMMATO', 'COMPLETATO', 'CANCELLATO', 'NO_SHOW') NOT NULL,
    `note` VARCHAR(191) NULL,
    `clienteId` INTEGER NOT NULL,
    `studioId` INTEGER NOT NULL,
    `servizioId` INTEGER NOT NULL,
    `tatuatoreId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `importo` DOUBLE NOT NULL,
    `metodo` ENUM('CONTANTI', 'CARTA', 'ONLINE') NOT NULL,
    `stato` ENUM('PAGATO', 'NON_PAGATO', 'IN_ATTESA') NOT NULL,
    `creatoIl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `appuntamentoId` INTEGER NOT NULL,

    UNIQUE INDEX `Pagamento_appuntamentoId_key`(`appuntamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utente` ADD CONSTRAINT `Utente_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servizio` ADD CONSTRAINT `Servizio_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appuntamento` ADD CONSTRAINT `Appuntamento_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appuntamento` ADD CONSTRAINT `Appuntamento_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appuntamento` ADD CONSTRAINT `Appuntamento_servizioId_fkey` FOREIGN KEY (`servizioId`) REFERENCES `Servizio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appuntamento` ADD CONSTRAINT `Appuntamento_tatuatoreId_fkey` FOREIGN KEY (`tatuatoreId`) REFERENCES `Utente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamento` ADD CONSTRAINT `Pagamento_appuntamentoId_fkey` FOREIGN KEY (`appuntamentoId`) REFERENCES `Appuntamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
